//to generate and add passwords to table
//run in docker exec
python manage.py shell

//run to generate hash
from django.contrib.auth.hashers import make_password

hashed_password = make_password('password123')  
print(hashed_password)

//take hash, add to database
INSERT INTO auth_user (
    password, 
    last_login, 
    is_superuser, 
    username, 
    first_name, 
    last_name, 
    email, 
    is_staff, 
    is_active, 
    date_joined
) VALUES (
    '<hashed_password>',       -- Replace with the actual hashed password
    NULL,                      
    FALSE,                     
    'jimbobob',                
    'jimbo',                   
    'bob',                     
    'jimbo@odu.edu',            
    FALSE,                     
    TRUE,                      
    NOW()                      
);


//example. username jimbo, password = password123 (hash output stored)
INSERT INTO auth_user (
    username, password, email, first_name, last_name, is_staff, is_active, is_superuser, date_joined
) VALUES (
    'jimbo',
    'pbkdf2_sha256$870000$d3LLWS2XuuHP62mWN0iIvJ$jPgiGrqd9i4Ak0EH4wDvRCULlWK4FoTotFcw78NgDnk=',
    'jimbo@odu.edu',
    'Jim',
    'Bo',
    TRUE,  -- is_staff
    TRUE,  -- is_active
    FALSE, -- is_superuser
    NOW()  -- date_joined
);