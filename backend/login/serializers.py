from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    bio = serializers.CharField(write_only=True, required=False)
    website = serializers.URLField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'bio', 'website')

    def create(self, validated_data):
        # Extract UserProfile-related fields
        bio = validated_data.pop('bio', '')
        website = validated_data.pop('website', '')

        # Create the user
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create the user profile
        UserProfile.objects.create(user=user, bio=bio, website=website)

        return user
