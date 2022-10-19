from django.urls import path, include
from comments import views

urlpatterns = [
    path('', views.user_comments),
    path('all/',views.get_all_comments),
    path('ViewVideo',views.get_all_comments)
]