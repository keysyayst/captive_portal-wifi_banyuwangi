<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PortalContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isUpdate = $this->isMethod('patch') || $this->isMethod('put');

        return [
            'content_type' => [$isUpdate ? 'sometimes' : 'required', 'in:announcement,ticker'],
            'message' => [$isUpdate ? 'sometimes' : 'required', 'string', 'max:1000'],
            'display_location' => [$isUpdate ? 'sometimes' : 'required', 'in:ticker,info'],
            'is_active' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
