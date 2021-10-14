import requests

response_token = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username': 'django', 'password': '21778821'})

response = requests.post('http://127.0.0.1:8000/api/users/',
                         data={'username': 'IT', 'firstname': 'Ivan', 'lastname': 'Turgenev', 'email': 'turg@ivan.ru'},
                         headers={'authorization': response_token.json().get('token')})

print(response.status_code)
print(response.json())

