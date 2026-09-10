<?php

test('redirects the home page to the portal', function () {
    $response = $this->get(route('home'));

    $response->assertRedirect(route('portal.login'));
});
