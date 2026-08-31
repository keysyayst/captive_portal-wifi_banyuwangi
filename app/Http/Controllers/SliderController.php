<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SliderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/SliderManagement', [
            'sliders' => Slider::latest()->get()
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $path = $request->file('image')->store('sliders', 'public');
        Slider::create(['image_path' => $path]);

        return redirect()->back();
    }

    public function destroy(Slider $slider): RedirectResponse
    {
        if (Storage::disk('public')->exists($slider->image_path)) {
            Storage::disk('public')->delete($slider->image_path);
        }
        $slider->delete();

        return redirect()->back();
    }
}
