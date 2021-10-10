import requests

response_token = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username': 'aleksandr', 'password': '21778821'})
# response = requests.post('http://127.0.0.1:8000/api/books/',
#                          data={'name': 'spamsdf'},
#                          headers={'authorization': response_token.json().get('token')})

response = requests.post('http://127.0.0.1:8000/api/authors/',
                         data={'first_name': 'Ivan', 'last_name': 'Turgenev', 'birthday_year': 1818},
                         headers={'authorization': response_token.json().get('token')})


print(response.status_code)
print(response_token.json().get('token'))
print(response.json())