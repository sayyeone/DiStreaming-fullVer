<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MovieCategory;
use App\Models\Movie;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Categories
        $action = MovieCategory::create([
            'name' => 'Action',
            'description' => 'Film dengan aksi dan petualangan yang menegangkan'
        ]);

        $drama = MovieCategory::create([
            'name' => 'Drama',
            'description' => 'Film dengan cerita dramatis dan emosional'
        ]);

        $comedy = MovieCategory::create([
            'name' => 'Comedy',
            'description' => 'Film komedi yang menghibur'
        ]);

        $horror = MovieCategory::create([
            'name' => 'Horror',
            'description' => 'Film horor yang menegangkan'
        ]);

        $scifi = MovieCategory::create([
            'name' => 'Sci-Fi',
            'description' => 'Film fiksi ilmiah'
        ]);

        // Create Movies
        Movie::create([
            'title' => 'The Dark Knight',
            'description' => 'Batman harus menerima salah satu ujian psikologis dan fisik terbesar untuk melawan ketidakadilan yang ditimbulkan oleh Joker.',
            'movie_category_id' => $action->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            'year' => 2008,
            'rating' => 9.0,
            'duration' => 152,
            'director' => 'Christopher Nolan',
            'cast' => 'Christian Bale, Heath Ledger, Aaron Eckhart'
        ]);

        Movie::create([
            'title' => 'Inception',
            'description' => 'Seorang pencuri yang mencuri rahasia korporat melalui teknologi berbagi mimpi diberi tugas terbalik untuk menanamkan ide ke dalam pikiran CEO.',
            'movie_category_id' => $scifi->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
            'year' => 2010,
            'rating' => 8.8,
            'duration' => 148,
            'director' => 'Christopher Nolan',
            'cast' => 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page'
        ]);

        Movie::create([
            'title' => 'The Shawshank Redemption',
            'description' => 'Dua pria yang dipenjara menjalin ikatan selama bertahun-tahun, menemukan ketenangan dan penebusan akhirnya melalui tindakan kebaikan biasa.',
            'movie_category_id' => $drama->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
            'year' => 1994,
            'rating' => 9.3,
            'duration' => 142,
            'director' => 'Frank Darabont',
            'cast' => 'Tim Robbins, Morgan Freeman, Bob Gunton'
        ]);

        Movie::create([
            'title' => 'Pulp Fiction',
            'description' => 'Kehidupan dua pembunuh bayaran, seorang petinju, istri seorang gangster, dan sepasang penjahat makan siang yang terjalin dalam empat kisah kekerasan dan penebusan.',
            'movie_category_id' => $action->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
            'year' => 1994,
            'rating' => 8.9,
            'duration' => 154,
            'director' => 'Quentin Tarantino',
            'cast' => 'John Travolta, Uma Thurman, Samuel L. Jackson'
        ]);

        Movie::create([
            'title' => 'Forrest Gump',
            'description' => 'Presidensi Kennedy dan Johnson, perang Vietnam, skandal Watergate dan peristiwa bersejarah lainnya terbentang dari sudut pandang pria Alabama dengan IQ 75.',
            'movie_category_id' => $drama->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
            'year' => 1994,
            'rating' => 8.8,
            'duration' => 142,
            'director' => 'Robert Zemeckis',
            'cast' => 'Tom Hanks, Robin Wright, Gary Sinise'
        ]);

        Movie::create([
            'title' => 'The Hangover',
            'description' => 'Tiga sahabat bangun dari pesta bujangan di Las Vegas, tanpa ingatan malam sebelumnya dan pengantin pria hilang.',
            'movie_category_id' => $comedy->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/qJ8hbGYSBzpdYHzrvPcXPfsRrL.jpg',
            'year' => 2009,
            'rating' => 7.7,
            'duration' => 100,
            'director' => 'Todd Phillips',
            'cast' => 'Bradley Cooper, Ed Helms, Zach Galifianakis'
        ]);

        Movie::create([
            'title' => 'The Conjuring',
            'description' => 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
            'movie_category_id' => $horror->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
            'year' => 2013,
            'rating' => 7.5,
            'duration' => 112,
            'director' => 'James Wan',
            'cast' => 'Patrick Wilson, Vera Farmiga, Ron Livingston'
        ]);

        Movie::create([
            'title' => 'Interstellar',
            'description' => 'Sekelompok penjelajah menggunakan lubang cacing yang baru ditemukan untuk melampaui batasan perjalanan ruang angkasa manusia dan menaklukkan jarak yang luas yang terlibat dalam perjalanan antarbintang.',
            'movie_category_id' => $scifi->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            'year' => 2014,
            'rating' => 8.6,
            'duration' => 169,
            'director' => 'Christopher Nolan',
            'cast' => 'Matthew McConaughey, Anne Hathaway, Jessica Chastain'
        ]);

        Movie::create([
            'title' => 'Avengers: Endgame',
            'description' => 'Setelah peristiwa menghancurkan dari Avengers: Infinity War, alam semesta berada dalam reruntuhan. Dengan bantuan sekutu yang tersisa, Avengers berkumpul sekali lagi.',
            'movie_category_id' => $action->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
            'year' => 2019,
            'rating' => 8.4,
            'duration' => 181,
            'director' => 'Anthony Russo, Joe Russo',
            'cast' => 'Robert Downey Jr., Chris Evans, Mark Ruffalo'
        ]);

        Movie::create([
            'title' => 'Parasite',
            'description' => 'Keserakahan dan diskriminasi kelas mengancam hubungan simbiosis yang baru terbentuk antara keluarga kaya Park dan klan Kim yang miskin.',
            'movie_category_id' => $drama->id,
            'poster_url' => 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
            'year' => 2019,
            'rating' => 8.6,
            'duration' => 132,
            'director' => 'Bong Joon Ho',
            'cast' => 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong'
        ]);
    }
}
