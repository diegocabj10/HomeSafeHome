/**
 * @swagger
 *  /claims:
 *    get:
 *      description: Get all claims
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
 *          description: Get all claims with pagination
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalItems:
 *                    type: integer
 *                    description: Total items
 *                  list:
 *                    type: array
 *                    description: List of claims
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                          description: Identification number.
 *                          example: 1
 *                        date:
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
 *                        response:
 *                          type: string
 *                          description: Response to the claim.
 *                          example: null
 *                        administratorUserId:
 *                          type: integer
 *                          description: Administrator user identification number.
 *                          example: 1
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
 *                  title:
 *                    type: string
 *                    description: Title of claim.
 *                    example: Falta recarga del matafuego
 *                  message:
 *                    type: string
 *                    description: Message of claim.
 *                    example: Falta recargar los matafuegos de los departamentos.
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
 * /claims/{id}:
 *   get:
 *     description: Get claim by id
 *     tags: [Claims]
 */
