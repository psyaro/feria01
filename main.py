from flask import Flask, request, render_template, jsonify, redirect
import random

app = Flask(__name__, static_folder='docs')

@app.route('/')
def hana():
    return redirect('/docs/index.html')

@app.route('/api/random/')
def q():
    return str(random.random())

if __name__ == "__main__":
    app.run(debug=True)