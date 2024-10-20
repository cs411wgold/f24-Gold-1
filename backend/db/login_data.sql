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