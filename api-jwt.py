import requests

response_1 = requests.post('http://127.0.0.1:8000/api/token/',
                           data={"username": "django", "password": "21778821"},
                           headers={'Content-Type': 'application/json'}
                           )

print(response_1.status_code)
