""" main.py is the top level script.

Return "Hello World" at the root URL.
"""

import os
import sys

# sys.path includes 'server/lib' due to appengine_config.py
from flask import Flask
from flask import render_template
app = Flask(__name__.split('.')[0])

@app.route('/')
def index(name=None):
  """ Return index template at application /index URL."""
  return render_template('index.html', name=name)

@app.route('/cards.html')
def cards(name=None):
  """ Return cards template at application /cards URL."""
  return render_template('cards.html', name=name)

@app.route('/memory2.html')
def memory2(name=None):
  """ Return memory2 template at application /memory2 URL."""
  return render_template('memory2.html', name=name)

@app.route('/names.html')
def names(name=None):
  """ Return names template at application /names URL."""
  return render_template('names.html', name=name)

@app.route('/chat.html')
def chat(name=None):
  """ Return chat template at application /chat URL."""
  return render_template('chat.html', name=name)