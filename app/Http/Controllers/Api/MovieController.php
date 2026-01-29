<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource with search, filter, and sorting
     */
    public function index(Request $request)
    {
        try {
            $query = Movie::with('movieCategory');

            // Search by title
            if ($request->has('search')) {
                $query->where('title', 'like', '%' . $request->search . '%');
            }

            // Filter by category
            if ($request->has('category_id')) {
                $query->where('movie_category_id', $request->category_id);
            }

            // Filter by year
            if ($request->has('year')) {
                $query->where('year', $request->year);
            }

            // Filter by rating class
            if ($request->has('rating_class')) {
                switch ($request->rating_class) {
                    case 'Top Rated':
                        $query->where('rating', '>=', 8.0);
                        break;
                    case 'Popular':
                        $query->whereBetween('rating', [6.0, 7.9]);
                        break;
                    case 'Regular':
                        $query->where('rating', '<', 6.0);
                        break;
                }
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 10);
            $movies = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Movies retrieved successfully',
                'data' => $movies
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve movies',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'movie_category_id' => 'required|exists:movie_categories,id',
            'poster_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'rating' => 'nullable|numeric|min:0|max:10',
            'duration' => 'nullable|integer|min:1',
            'director' => 'nullable|string|max:255',
            'cast' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $movie = Movie::create($request->all());
            $movie->load('movieCategory');

            return response()->json([
                'success' => true,
                'message' => 'Movie created successfully',
                'data' => $movie
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create movie',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $movie = Movie::with('movieCategory')->find($id);

            if (!$movie) {
                return response()->json([
                    'success' => false,
                    'message' => 'Movie not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Movie retrieved successfully',
                'data' => $movie
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve movie',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'movie_category_id' => 'required|exists:movie_categories,id',
            'poster_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'rating' => 'nullable|numeric|min:0|max:10',
            'duration' => 'nullable|integer|min:1',
            'director' => 'nullable|string|max:255',
            'cast' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $movie = Movie::find($id);

            if (!$movie) {
                return response()->json([
                    'success' => false,
                    'message' => 'Movie not found'
                ], 404);
            }

            $movie->update($request->all());
            $movie->load('movieCategory');

            return response()->json([
                'success' => true,
                'message' => 'Movie updated successfully',
                'data' => $movie
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update movie',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $movie = Movie::find($id);

            if (!$movie) {
                return response()->json([
                    'success' => false,
                    'message' => 'Movie not found'
                ], 404);
            }

            $movie->delete();

            return response()->json([
                'success' => true,
                'message' => 'Movie deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete movie',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get trending movies (Top 10 by rating)
     */
    public function trending()
    {
        try {
            $movies = Movie::with('movieCategory')
                ->orderBy('rating', 'desc')
                ->take(10)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Trending movies retrieved successfully',
                'data' => $movies
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve trending movies',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
