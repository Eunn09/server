import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,          // 20 usuarios virtuales
  duration: '30s',  // durante 30 segundos
};

const BASE_URL = 'https://server-2aa6.onrender.com';

export default function () {

  // Endpoint 1: Obtener registros ordenados
  const telemetryRes = http.get(`${BASE_URL}/api/telemetry`);

  check(telemetryRes, {
    'telemetry status 200': (r) => r.status === 200,
    'telemetry response time < 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(1);

  // Endpoint 2: Obtener contador total
  const countRes = http.get(`${BASE_URL}/api/telemetry/count`);

  check(countRes, {
    'count status 200': (r) => r.status === 200,
    'count response time < 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(1);

  // Endpoint 3: Obtener intervalo dinámico
  const updateRes = http.get(`${BASE_URL}/api/update`);

  check(updateRes, {
    'update status 200': (r) => r.status === 200,
    'update has interval': (r) => JSON.parse(r.body).update_interval !== undefined,
  });

  sleep(1);
}
