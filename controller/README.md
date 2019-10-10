# Controller code does all the services related code for the frontend UI
Code for controller in Phase1 and Phase2 directories

## Phase 1
The controller code is written in python or javascript. And is called via the frontend. Later in phase 2 this code will be called via FaaS



### Features
1) React D3 market charting
2) Payment - stripe
3) Login - firebase
4) Service for Bitcoin
    * Top and bottom of market
    * Buy and Sell entry/exit signals
    * ML price prediction
    * Data from Coinbase
        * Hourly and daily bars
        https://pro.coinbase.com/
5) Front end runs controller directly

## Phase 2
Add additional features getting ready for product launch.

#### Features
1) Change architecture for scalablity to a FaaS model (Serverless)
2) Host FaaS on GCP
    * Use Kubeflow Link: https://www.kubeflow.org/
        * REST and gRPC interfaces
3) Convert phase 1 control code to services
4) Additional data services 
    * exchanges
    * instruments
    * bar types
5) Store data and signals in TSDB https://github.com/v3io/tsdb-nuclio
