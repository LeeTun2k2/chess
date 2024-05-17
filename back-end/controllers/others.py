from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from services.image import ImageService
from services.other import OtherService
import requests
import hmac
import hashlib
import uuid
other_bp = Blueprint('other', __name__)

images_service = ImageService()
others_service = OtherService()

@other_bp.route('/api/donate', methods=['PUT'])
@jwt_required()
def update_book():
    try:
        image = request.files.get('image')
        updated = images_service.save_file(image, "donate", image.filename.split(".")[-1])
        if updated:
            return jsonify({
                "message": "success",
            }), 200
        else:
            return jsonify({'message': 'Book not found'}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    

@other_bp.route('/api/offline-calendar', methods=['GET'])
def get_offline_calendar():
    try:
        offline_calendar = others_service.get_offline_calendar()
        return jsonify({
            "message": "success",
            "offline_calendar": offline_calendar
        }), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@other_bp.route('/api/offline-calendar', methods=['PUT'])
@jwt_required()
def set_offline_calendar():
    try:
        data = request.get_json()
        
        updated = others_service.set_offline_calendar(data["time"], data["location"])
        if updated:
            return jsonify({
                "message": "success",
            }), 200
        else:
            return jsonify({'message': 'Fail to set value'}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    

@other_bp.route('/api/momo_payment', methods=['POST'])
def create_payment():
    endpoint = "https://test-payment.momo.vn/v2/gateway/api/create"
    accessKey = "F8BBA842ECF85"
    secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
    orderInfo = "pay with MoMo"
    partnerCode = "MOMO"
    redirectUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b"
    ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b"
    amount = request.json.get('amount')
    orderId = str(uuid.uuid4())
    requestId = str(uuid.uuid4())
    extraData = ""  # pass empty value or Encode base64 JsonString

    rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=captureWallet"
    h = hmac.new(bytes(secretKey, 'ascii'), bytes(rawSignature, 'ascii'), hashlib.sha256)
    signature = h.hexdigest()

    data = {
        'partnerCode': partnerCode,
        'partnerName': "Test",
        'storeId': "MomoTestStore",
        'requestId': requestId,
        'amount': amount,
        'orderId': orderId,
        'orderInfo': orderInfo,
        'redirectUrl': redirectUrl,
        'ipnUrl': ipnUrl,
        'lang': "vi",
        'extraData': extraData,
        'requestType': "captureWallet",
        'signature': signature
    }

    response = requests.post(endpoint, json=data, headers={'Content-Type': 'application/json'})
    return jsonify(response.json())