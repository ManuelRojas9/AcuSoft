"""acusoft URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from acusoft.views import home, login, user_inicio, user_proyectos, user_proyecto1, user_nuevoarchivo, estudiorecinto, estudiorecinto_resp, disenopaneles, disenopaneles_resp

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('login/', login),
    path('user/inicio/', user_inicio),
    path('user/proyectos/', user_proyectos),
    path('user/proyectos/Proyecto_1/', user_proyecto1),
    path('user/proyectos/Proyecto_1/nuevo_archivo/', user_nuevoarchivo),
    path('estudiorecinto/', estudiorecinto),
    path('estudiorecinto_resp/', estudiorecinto_resp),
    path('disenopaneles/', disenopaneles),
    path('disenopaneles_resp/', disenopaneles_resp),

]
