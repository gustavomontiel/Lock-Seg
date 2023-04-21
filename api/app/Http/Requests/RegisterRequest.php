<?php

namespace App\Http\Requests;

use Pearl\RequestValidate\RequestAbstract;

class RegisterRequest extends RequestAbstract
{
    /**
    * Sanitize request data before validation.
    */
    protected function prepareForValidation()
    {
        $this->merge(['email' => strtoLower($this->input('email'))]);
        $this->merge(['username' => strtoLower($this->input('username'))]);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|unique:users,email',
            'password' => 'required',
            'name' => 'string',
            'username' => 'required|unique:users,username'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages():array
    {
        return [
            //
        ];
    }
}
