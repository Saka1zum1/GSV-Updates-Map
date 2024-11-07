exports.handler = async function(event, context) {
  const { default: fetch } = await import('node-fetch');
  

  const discordToken = process.env.DISCORD_TOKEN;
  const { channel_id, message_id } = event.queryStringParameters;
  
  if (!channel_id || !message_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing channel_id or message_id' })
    };
  }
  else if (!channel_id in ["774703077172838430","1148013283006218352"]){
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Wrong channel_id' })
    };
  }

  try {
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