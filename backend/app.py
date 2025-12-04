from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Habilitar CORS para permitir solicitudes desde tu frontend

# Simulación de una base de datos de usuarios (NO USAR EN PRODUCCIÓN)
users = {
    "testuser": "testpass",
    "admin": "adminpass"
}

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

    if users.get(username) == password:
        # En un sistema real, aquí se generaría un token JWT o una sesión
        return jsonify({"message": "Inicio de sesión exitoso", "username": username}), 200
    else:
        return jsonify({"message": "Usuario o contraseña incorrectos"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Faltan usuario o contraseña"}), 400

    if username in users:
        return jsonify({"message": "El usuario ya existe"}), 409 # 409 Conflict

    users[username] = password # En un sistema real, aquí la contraseña se cifraría
    print(f"Usuario registrado: {username}")
    print(f"Usuarios actuales: {users}")
    return jsonify({"message": "Registro exitoso", "username": username}), 201 # 201 Created

if __name__ == '__main__':
    app.run(debug=True, port=5000)
