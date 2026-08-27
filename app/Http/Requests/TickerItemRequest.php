<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TickerItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'message' => [$this->isMethod('post') ? 'required' : 'sometimes', 'string', 'max:1000'],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
