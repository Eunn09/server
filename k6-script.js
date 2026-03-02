import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,          // 20 usuarios virtuales
  duration: '30s',  // durante 30 segundos
};

export default function () {

  const loginPayload = JSON.stringify({
    email: 'usuario@correo.com',
    password: '123456'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Endpoint 1: Login
  const loginRes = http.post('https://server-2aa6.onrender.com/api/telemetry', loginPayload, params);

  check(loginRes, {
    'login status 200': (r) => r.status === 200,
  });

  sleep(1);

  // Endpoint 2: Obtener productos
  const productsRes = http.get('https://server-2aa6.onrender.com/api/update');

  check(productsRes, {
    'productos status 200': (r) => r.status === 200,
  });

  sleep(1);
}
