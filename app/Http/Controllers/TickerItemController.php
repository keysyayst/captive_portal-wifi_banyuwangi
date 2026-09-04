<?php

namespace App\Http\Controllers;

use App\Http\Requests\TickerItemRequest;
use App\Models\TickerItem;
use Illuminate\Http\JsonResponse;

class TickerItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'ticker_items' => TickerItem::query()
                ->where('is_active', true)
                ->where('display_location', 'ticker')
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(['id', 'message']),
        ]);
    }

    public function adminIndex(): JsonResponse
    {
        return response()->json([
            'ticker_items' => TickerItem::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(),
        ]);
    }

    public function store(TickerItemRequest $request): JsonResponse
    {
        return response()->json([
            'ticker_item' => TickerItem::query()->create($request->validated()),
        ], 201);
    }

    public function show(TickerItem $tickerItem): JsonResponse
    {
        return response()->json(['ticker_item' => $tickerItem]);
    }

    public function update(TickerItemRequest $request, TickerItem $tickerItem): JsonResponse
    {
        $tickerItem->update($request->validated());

        return response()->json(['ticker_item' => $tickerItem->fresh()]);
    }

    public function destroy(TickerItem $tickerItem): JsonResponse
    {
        $tickerItem->delete();

        return response()->json([], 204);
    }
}
