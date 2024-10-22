from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# SignUpForm extends Django's UserCreationForm and adds a required email field.
# This form will be used for user registration.
class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)  # Adding a required email field.

    class Meta:
        model = User
        # Defining the fields shown in the form (username, email, password1, password2).
        # Password1 and Password2 are used for confirming the password during signup.
        fields = ('username', 'email', 'password1', 'password2')

    # This method ensures the provided email is unique in the database.
    def clean_email(self):
        email = self.cleaned_data.get('email')  # Extracting the email from cleaned data.
        
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("This email address is already in use.")
        return email


# LoginForm handles user login. It asks for a username and password.
class LoginForm(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(widget=forms.PasswordInput, required=True) 

