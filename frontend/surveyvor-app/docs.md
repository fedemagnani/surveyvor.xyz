Defining route:

0. /

1. /login

# Consumer side

## List all surveys

2. /consumer/surveys

## Survey preview

3. /consumer/surveys/{id}:

- /consumer/surveys/{id}/preview
- /consumer/surveys/{id}/wizard/presurvey
- /consumer/surveys/{id}/wizard/emailconfirm
- /consumer/surveys/{id}/wizard/survey
- /consumer/surveys/{id}/wizard/result

# Producer side

## List all surveys

4. /producer/surveys

## Survey preview, close campaign, export data

5. /producer/surveys/{id}

- /producer/surveys/{id}/preview
- /producer/surveys/{id}/withdraw
- /producer/data/{id}
