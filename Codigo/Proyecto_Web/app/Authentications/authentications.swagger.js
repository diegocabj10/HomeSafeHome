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
 *      security: []
 *      responses:
 *        200:
 *          description: Successfully authenticated. The accessToken and refreshToken are returned in two cookies name `accessToken` and `refreshToken`. You need to include these two cookies in subsequent requests.
 *          headers:
 *            Set-Cookie:
 *              description: Json Web Token of access, this is valid for 24 hours
 *              schema:
 *                type: string
 *                example: accessToken=longjwt; Path=/; HttpOnly
 *            " Set-Cookie":
 *              description: Json Web Token of refresh, this is valid for 14 days
 *              schema:
 *                type: string
 *                example: refreshToken=longjwt; Path=/; HttpOnly
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
 * @swagger
 *  /authentications/refresh:
 *    post:
 *      description: Refresh access token.
 *      tags: [Authentications]
 *      security: []
 *      responses:
 *        200:
 *          description: Successfull refresh token. The accessToken and refreshToken are returned in two cookies name `accessToken` and `refreshToken`. You need to include these two cookies in subsequent requests.
 *          headers:
 *            Set-Cookie:
 *              description: Json Web Token of access, this is valid for 24 hours
 *              schema:
 *                type: string
 *                example: accessToken=longjwt; Path=/; HttpOnly
 *            " Set-Cookie":
 *              description: Json Web Token of refresh, this is valid for 14 days
 *              schema:
 *                type: string
 *                example: refreshToken=longjwt; Path=/; HttpOnly
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
