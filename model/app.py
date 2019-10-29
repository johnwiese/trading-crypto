from datetime import datetime

import numpy as np
import pandas as pd
from fastai.tabular import add_datepart, load_learner
from flask import Flask, jsonify, render_template, request, send_from_directory

from flask_cors import CORS

app = Flask(__name__, static_folder='public', static_url_path='')
cors = CORS(app)
infer = load_learner('.', file='./date_prev_btc_model.pkl')

def pred_single(date, prev, learn=infer):
  print(f'Getting predictions for date {date} with prev closing price of {prev}')
  df = pd.DataFrame(dict(Date=date, prev=prev), index=[0])
  add_datepart(df, 'Date')
  pred = learn.predict(df.iloc[0])
  print(pred)
  res = round(np.exp(pred[0].data.item()), 2)
  print(res)
  return res

@app.route("/pred")
def home():
    date = request.args.get('date', datetime.now().strftime('%Y-%m-%d'))
    prev = float(request.args.get('prev', '7300.'))
    print(date, prev, type(date), type(prev))
    return jsonify(prediction=pred_single(date, prev), date=date, prev=prev)

if __name__ == "__main__":
    # pred_single('2019-09-26', 8438)
    # app.jinja_env.auto_reload = True
    # app.config['TEMPLATES_AUTO_RELOAD'] = True
    # app.run(debug=False)
    app.run(port=8080)
