import { NextResponse } from 'next/server';

const getAuthHeaders = () => {
    return {
        'Content-Type': 'application/json'
        // 'x-api-key': process.env.API_KEY
    };
};

export async function POST(request) {
    try {
        const payload = await request.json();

        console.log('\n=== Generate Program API Call ===');
        console.log('Timestamp:', new Date().toISOString());
        console.log('Request Payload:', JSON.stringify(payload, null, 2));

        // Validate required fields
        const requiredFields = ['user_id', 'age', 'gender', 'chat_history', 'coach_id', 'language', 'number_of_weeks'];
        for (const field of requiredFields) {
            if (!payload[field]) {
                const error = `Missing required field: ${field}`;
                console.log('Validation Error:', error);
                return NextResponse.json(
                    { error },
                    { status: 400 }
                );
            }
        }

        // Set default values for optional fields
        const data = {
            ...payload,
            height_unit: payload.height_unit || 'cm',
            weight_unit: payload.weight_unit || 'kg',
            sport: payload.sport || 'fitness'
        };

        console.log('Processed Payload:', JSON.stringify(data, null, 2));
        console.log('API URL:', `${process.env.PROGRAM_SERVICE_API_URL}/test/generate_program_from_chat_history_chuncks`);
        console.log('Headers:', JSON.stringify(getAuthHeaders(), null, 2));

        // Forward the request to your actual API endpoint
        const apiResponse = await fetch(`${process.env.PROGRAM_SERVICE_API_URL}/test/generate_program_from_chat_history_chuncks`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.error('API Error Response:', {
                status: apiResponse.status,
                statusText: apiResponse.statusText,
                body: errorText
            });
            throw new Error(`API responded with status: ${apiResponse.status}`);
        }

        const responseData = await apiResponse.json();
        console.log('API Response:', JSON.stringify(responseData, null, 2));

        if (responseData.status !== 'success') {
            console.error('Program Generation Failed:', responseData);
            throw new Error('Program generation failed: Unexpected response status');
        }

        console.log('=== End Generate Program API Call ===\n');
        return NextResponse.json(responseData);
    } catch (error) {
        console.error('Program generation error:', {
            message: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
} 