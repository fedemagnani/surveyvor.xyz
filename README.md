# TODO
- {OK} Integrate Web3Wallet (frontend) (walletconnect) 
- Web3.js integration with gnosis sc (both frontend/backend)
    - [Frontend]: send survey on IExec and wait for confirmations on-chain ->  [Frontend]: send request to backend -> [Backend] invokes `add_respondent()` (gnosis sc) and wait for confirmation on-chain -> [Backend] answers to frontend -> [Frontend] says "thank you for your submission, you've been rewarded with"
    - When surveyprod invokes `close_survey()`, must have a list of exportable data
    - Whitelist service account on chronicle (to fetch token prices)
- Web3.js integration with iExec (frontend)
- Add mail as mandatory field in the survey
- Survey creation
- Web3Mail integration (when data is exported)


# Core components

- WalletConnect !!! (>FILO)
    - web3wallet -> wallet integration
    - Web3Inbox (TBD: receive notifications for events)

- Figma !!! (>FILO)
    - Mockup 

- Gnosis Smart Contract !!! (>FEDE)
    - main backend components

- iExec !!! (>FEDE) 
    - upload sensitive content
    - whitelist addresses
    - access to personal content
    - web3mail -> send confirmation email once that you complete the survey


- Safe !!! (>FEDE)
    - generate escrow accounts

- Near (TBD: survey components/website components) ! 

- Chronicle !!
    - fetch token prices

- Neon, CoreDAO (TBD: multichain deployment)

- 

# Main Smart Contracts
- Before funding the survey, surveyprod must grant allowance to the gnosis contract at least for the _survey_gas amount
- By submitting the answer to the survey, surveyprod grant allowance to the respondent for the _amount_prize amount 

# Survey
- Every survey must ask for the mail of the guy (maybe we can ask the guy to submit its mail once that it connects)
- Mail could be a hedge against sybil attacks





