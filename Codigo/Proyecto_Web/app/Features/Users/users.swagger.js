/**
 * @swagger
 *  /users:
 *    post:
 *      description: Create an user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *                - name
 *                - lastName
 *              properties:
 *                email:
 *                  type: string
 *                  description: The user's email.
 *                  example: diegocampos0909@gmail.com
 *                password:
 *                  type: string
 *                  description: The user's password.
 *                  example: admin1234
 *                name:
 *                  type: string
 *                  description: The user's name.
 *                  example: Diego
 *                lastName:
 *                  type: string
 *                  description: The user's lastName.
 *                  example: Campos
 *      security: []
 *      responses:
 *        200:
 *          description: Successfully user created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    description: The user's email.
 *                    example: diegocampos0909@gmail.com
 *                  name:
 *                    type: string
 *                    description: The user's name.
 *                    example: Diego
 *                  lastName:
 *                    type: string
 *                    description: The user's lastName.
 *                    example: Campos
 *        406:
 *          description: That user already exists.
 *        500:
 *          description: Internal server error
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
