Prueba desarrollador BACKEND  “Citas medicas”

 

1._ Desarrollar una api rest en NODE JS, base de datos (mysql) con la siguiente información:  

Crear base de datos con 3 tablas relacionadas
Paciente
Citas
Servicios
Crear los siguientes end point, tomando en cuenta el método que corresponde a la consulta
Registrar paciente
Solicitar información del paciente
Actualizar datos del paciente
Inactivar o desactivar paciente
Eliminar paciente, tomando en cuenta que no debe tener citas e historial medico
Crear una cita al paciente, es decir, debe tener asignado el tipo de examen que se va realizar el paciente, es una relación con la tabla servicios
Editar Cita
Eliminar cita
Crear servicios que ofrece la clínica para el paciente
Editar
Eliminar, tomando en cuento que el servicio no este asociado a una cita
Consultar un reporte por fecha de las citas medicas relacionada por paciente.
 

Trabajar con la siguiente librería:

Dotenv
Express
Mysql