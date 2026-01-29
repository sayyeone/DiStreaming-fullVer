<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    /**
     * Relasi: Satu kategori punya banyak film
     */
    public function movies()
    {
        return $this->hasMany(Movie::class);
    }
}
