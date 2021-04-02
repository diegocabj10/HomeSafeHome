/**
 * @swagger
 *  /events:
 *    post:
 *      description: Create new event
 *      tags: [Events]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - signalId
 *                - devideId
 *                - value
 *              properties:
 *                signalId:
 *                  type: integer
 *                  description: Signal identification number.
 *                  example: 1
 *                deviceId:
 *                  type: integer
 *                  description: Device identification number.
 *                  example: 1
 *                value:
 *                  type: integer
 *                  description: Signal value.
 *                  example: 100
 *      security: []
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