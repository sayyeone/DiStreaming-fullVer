<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'movie_category_id',
        'poster_url',
        'video_url',
        'year',
        'rating',
        'duration',
        'director',
        'cast'
    ];

    protected $appends = ['rating_class'];

    /**
     * Relasi: Satu film milik satu kategori
     */
    public function movieCategory()
    {
        return $this->belongsTo(MovieCategory::class);
    }

    /**
     * Accessor: Klasifikasi rating
     */
    public function getRatingClassAttribute()
    {
        if ($this->rating >= 8.0) {
            return 'Top Rated';
        } elseif ($this->rating >= 6.0) {
            return 'Popular';
        } else {
            return 'Regular';
        }
    }
}
