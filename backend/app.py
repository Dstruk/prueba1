from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
import os
import jwt # Importar PyJWT
import datetime

app = Flask(__name__)
CORS(app) # Habilitar CORS para permitir solicitudes desde tu frontend

# --- Configuración de Flask --- 
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'una_clave_secreta_muy_segura_y_larga' # Usar una clave secreta fuerte

# --- Configuración de la Base de Datos SQLite ---
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Deshabilitar el seguimiento de modificaciones para ahorrar recursos
db = SQLAlchemy(app)

# --- Modelo de Usuario ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

# --- Rutas de la Aplicación ---

@app.route('/')
def hello_world():
    return jsonify({"message": "Hello from Flask Backend!"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Faltan usuario o contraseña"}), 400

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        # Generar un token JWT
        token = jwt.encode({
            'user_id': user.id,
            'username': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1) # Token válido por 1 hora
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({"message": "Inicio de sesión exitoso", "token": token}), 200
    else:
        return jsonify({"message": "Usuario o contraseña incorrectos"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Faltan usuario o contraseña"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "El usuario ya existe"}), 409 # 409 Conflict

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password_hash=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()

    print(f"Usuario registrado en DB: {username}")
    return jsonify({"message": "Registro exitoso", "username": username}), 201 # 201 Created

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Crea las tablas de la DB si no existen
        # Opcional: Añadir usuarios iniciales si la DB está vacía
        if not User.query.filter_by(username='testuser').first():
            test_user = User(username='testuser', password_hash=generate_password_hash('testpass'))
            admin_user = User(username='admin', password_hash=generate_password_hash('adminpass'))
            db.session.add(test_user)
            db.session.add(admin_user)
            db.session.commit()
            print("Usuarios iniciales 'testuser' y 'admin' creados en la DB.")

    app.run(debug=True, port=5000)
