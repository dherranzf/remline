from django.shortcuts import render, redirect

from django.http import HttpResponse


def re_remline(request):
    return redirect('/remline/')