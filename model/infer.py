from fastai.tabular import load_learner, add_datepart
import pandas as pd
import numpy as np


infer = load_learner('.', file='date_prev_btc_model.pkl')
def pred_single(date, prev, learn=infer):
  print(f'Getting predictions for date {date} with prev closing price of {prev}')
  df = pd.DataFrame(dict(Date=date, prev=prev), index=[0])
  add_datepart(df, 'Date')
  pred = learn.predict(df.iloc[0])
  print(pred)
  res = round(np.exp(pred[0].data.item()), 2)
  print(res)
  return res

if __name__ == "__main__":
    pred_single('2019-09-26', 8438)
