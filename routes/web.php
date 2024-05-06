<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('tetris');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
