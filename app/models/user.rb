class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :omniauthable

  include PgSearch
  after_initialize :ensure_session_token

  validates :session_token, :email, :password_digest, presence: true
  validates :session_token, :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  has_many(:authored_books,
           class_name: "Book",
           foreign_key: :author_id,
           primary_key: :id,
           inverse_of: :author
           )

  has_many :collections

  has_many(:comments,
           class_name: "Comment",
           foreign_key: :commenter_id,
           primary_key: :id,
           inverse_of: :commenter
           )
            
  has_many(:comments_on,
           class_name: "Comment",
           foreign_key: :commentable_id,
           primary_key: :id,
           as: :commentable
          )

  has_many(:received_messages,
           class_name: "Message",
           foreign_key: :to_id,
           primary_key: :id,
           inverse_of: :to
           )

  has_many(:sent_messages,
           class_name: "Message",
           foreign_key: :from_id,
           primary_key: :id,
           inverse_of: :from
           )

  has_many(:likings,
           class_name: "Like",
           foreign_key: :liker_id,
           primary_key: :id,
           inverse_of: :liker
           )

  has_many(:likes, 
           class_name: "Like",
           foreign_key: :likable_id,
           primary_key: :id,
           as: :likable
           )

  has_many :likers, through: :likes, source: :liker

  pg_search_scope :search_on_fname_lname, against: [:fname, :lname]

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    user && user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid])
    email = "#{auth_hash[:uid]}@fbpea.com"
    unless user
      user = User.create!(
            provider: auth_hash[:provider],
            uid: auth_hash[:uid],
            email: email, 
            fname: auth_hash[:info][:first_name],
            lname: auth_hash[:info][:last_name],
            password: SecureRandom::urlsafe_base64)
    end
    user
  end

  def likes?(user)
    liked = user.likers
    liked.include?(self)
  end

  def generate_token
    random_token = SecureRandom.base64(16)

    until self.session_token != random_token
      random_token = SecureRandom.base64(16)
    end

    random_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password).to_s
  end

  def ensure_session_token
    self.session_token ||= generate_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_token
    self.save!
    self.session_token
  end


end
