/**
 * @swagger
 *  /claims:
 *    get:
 *      description: Returns all claims from the system that the user has access to
 *      tags: [Claims]
 *      parameters:
 *        - in: query
 *          name: size
 *          description: Max records to return
 *          schema:
 *            type: integer
 *        - in: query
 *          name: page
 *          description: Number of page
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: A user login
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalItems:
 *                    type: integer
 *                    description: Total items
 *                  lista:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          description: Identification number.
 *                          example: 1
 *                        notificationDate:
 *                          type: string
 *                          description: Notification date.
 *                          example: 2020-12-30T20:49:21.000Z
 *                        title:
 *                          type: string
 *                          description: Title of claim.
 *                          example: Falta recarga del matafuego.
 *                        message:
 *                          type: string
 *                          description: Message of claim.
 *                          example: Falta recargar los matafuegos de los departamentos.
 *                        userId:
 *                          type: integer
 *                          description: User identification number.
 *                          example: 1
 *                        response:
 *                          type: string
 *                          description: Response to the claim.
 *                          example: null
 *                        deletionDate:
 *                          type: string
 *                          description: Deletion date.
 *                          example: null
 *                        createdAt:
 *                          type: string
 *                          description: Creation date.
 *                          example: 2020-12-30T20:49:21.000Z
 *                        updatedAt:
 *                          type: string
 *                          description: Modification date.
 *                          example: 2020-12-30T20:49:21.000Z
 *                  totalPages:
 *                    type: integer
 *                    description: Total pages
 *                    example: 1
 *                  currentPage:
 *                    type: integer
 *                    description: Current page
 *                    example: 0
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
 *    post:
 *      description: Create new claim
 *      tags: [Claims]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - message
 *              properties:
 *                title:
 *                  type: string
 *                  description: Title of claim.
 *                  example: Falta recarga del matafuego
 *                message:
 *                  type: string
 *                  description: Message of claim.
 *                  example: Falta recargar los matafuegos de los departamentos.
 *      responses:
 *        200:
 *          description: New event is created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - signalId
 *                  - devideId
 *                  - value
 *                properties:
 *                  signalId:
 *                    type: integer
 *                    description: Signal identification number.
 *                    example: 1
 *                  deviceId:
 *                    type: integer
 *                    description: Device identification number.
 *                    example: 1
 *                  value:
 *                    type: integer
 *                    description: Signal value.
 *                    example: 100
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
