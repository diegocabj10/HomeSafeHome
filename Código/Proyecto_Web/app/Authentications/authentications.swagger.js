/**
 * @swagger
 *  /authentications/login:
 *    post:
 *      description: Login an user
 *      tags: [Authentications]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  description: The user's email.
 *                  example: diegocampos0909@gmail.com
 *                password:
 *                  type: string
 *                  description: The user's password.
 *                  example: admin1234
 *      responses:
 *        200:
 *          description: A user login
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    description: The user's email.
 *                    example: diegocampos0909@gmail.com
 *                  password:
 *                    type: string
 *                    description: The user's password.
 *                    example: admin1234
 *        400:
 *          description: Invalid parameters
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  internal code:
 *                    type: string
 */