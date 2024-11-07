const { default: fetch } = await import('node-fetch');
const cache = {}; 

exports.handler = async function(event, context) {
  const discordToken = process.env.DISCORD_TOKEN;
  const { channel_id, message_id } = event.queryStringParameters;
  
  if (!channel_id || !message_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing channel_id or message_id' })
    };
  }

 
  const validChannels = ["774703077172838430", "1148013283006218352"];
  if (!validChannels.includes(channel_id)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Wrong channel_id' })
    };
  }


  const cacheKey = `${channel_id}-${message_id}`;


  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp) < 15000) {  
    return {
      statusCode: 429,
      body: JSON.stringify({ error: 'Too many requests. Please wait before retrying.' })
    };
  }

  try {
 
    cache[cacheKey] = { timestamp: Date.now() };

    const url = `https://discord.com/api/v9/channels/${channel_id}/messages?around=${message_id}&limit=1`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bot ${discordToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Failed to fetch message. Status: ${response.status}` })
      };
    }

    const data = await response.json();

    if (data.length > 0) {
      const attachments = data[0].attachments;
      const attachmentUrl = attachments[0].url;
      return {
        statusCode: 200,
        body: JSON.stringify({ attachmentUrl })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'No attachments found.' })
      };
    }

  } catch (error) {
    console.error('Error fetching Discord message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
