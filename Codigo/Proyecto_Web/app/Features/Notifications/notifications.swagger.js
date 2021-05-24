/**
 * @swagger
 *  /notifications:
 *    get:
 *      description: Returns all notifications from the system that the user has access to
 *      tags: [Notifications]
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
 *                  list:
 *                    type: array
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
 *                        eventId:
 *                          type: integer
 *                          description: Event identification number.
 *                          example: 10
 *                        title:
 *                          type: string
 *                          description: Title notification.
 *                          example: Monoxido de Carbono
 *                        message:
 *                          type: string
 *                          description: Message notification.
 *                          example: Presencia de CO (+0.01%) Cefalea leve en 2 o 3 horas.
 *                        deviceName:
 *                          type: string
 *                          description: Device name.
 *                          example: Arduino1
 *                        userId:
 *                          type: integer
 *                          description: User identification number.
 *                          example: 1
 *                        readDate:
 *                          type: string
 *                          description: Reading date.
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
 */