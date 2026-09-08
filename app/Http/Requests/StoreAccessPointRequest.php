<?php

namespace App\Http\Requests;

use App\Models\AccessPoint;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreAccessPointRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<mixed>>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'ip_address' => [
                'nullable',
                'ip',
                'max:45',
            ],
            'mac_address' => [
                'required',
                'string',
                'max:17',
                'regex:/^(?:[0-9A-F]{2}:){5}[0-9A-F]{2}$/',
                Rule::unique(AccessPoint::class, 'mac_address'),
            ],
            'location' => [
                'nullable',
                'string',
                'max:255',
            ],
            'status' => [
                'required',
                Rule::in(['Online', 'Offline']),
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => Str::squish(
                $this->string('name')->toString(),
            ),
            'ip_address' => $this->filled('ip_address')
                ? $this->string('ip_address')->trim()->toString()
                : null,
            'mac_address' => Str::upper(
                Str::replace(
                    '-',
                    ':',
                    $this->string('mac_address')->trim()->toString(),
                ),
            ),
            'location' => $this->filled('location')
                ? Str::squish($this->string('location')->toString())
                : null,
        ]);
    }

    public function attributes(): array
    {
        return [
            'name' => 'nama AP',
            'ip_address' => 'alamat IP',
            'mac_address' => 'alamat MAC',
            'location' => 'lokasi',
            'status' => 'status',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama AP wajib diisi.',
            'ip_address.ip' => 'Alamat IP tidak valid.',
            'mac_address.required' => 'Alamat MAC wajib diisi.',
            'mac_address.regex' => 'Format alamat MAC harus seperti AA:BB:CC:DD:EE:FF.',
            'mac_address.unique' => 'Alamat MAC sudah digunakan oleh AP lain.',
            'status.in' => 'Status AP tidak valid.',
        ];
    }
}