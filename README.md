# trading-crypto Project
Bitcoin trading signals service for entry and exit signals. Combines Machine Learning and traditional trading methods.

Project Link: https://friendlychat-b2e39.firebaseapp.com/


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
5) Front end runs controller directly

### Phases
    1) Phase 1
        - React JS
        - Firebase auth and login
        - Stripe payment
        - D3 for charting market
        - Coinbase exchange
        - Day and hour bars
        - Signals
            - Market bottom and top zones
            - ML price perdictions
            - Entry and exit signals
    2) Phase 2
        Productization of service adding additional features and system scalablity

        - FaaS (serverless) Architecture
        - GCP running https://www.kubeflow.org/ services
        - New Features
            - Additional ML signal enhancements (E.g. Sentiment)
            - Add risk statment on signup.
            - Cleanup and enhance UI and content
            - Add additional exchanges and instruments
            - Define and enhance user payment levels (Free, Regular, Advanced)


### Directory structure
    Directories contain additional README.md files.
        * frontend - provides user UI/UX code
        * controller - functions and services for both phases.
        * serverless - Kubeflow, nuclio, Kubernetes, kafka: code and configuration for phase2
        * assets - contains data files and images being used by projects

### Team
    - John Wiese
    - Lawrence McDonell
    - Kiran Ramineni

