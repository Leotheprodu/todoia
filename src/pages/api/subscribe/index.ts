import { APIRoute } from 'astro';
export const prerender = false;
const tokenCampainEmailService = import.meta.env.TOKEN_MAIL_CAMPAIN;
const groupCampainEmailService = import.meta.env.GROUP_MAIL_CAMPAIN;

export const PATCH: APIRoute = async ({ request }) => {
  const { email } = await request.json();
  try {
    const response = await fetch(
      `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenCampainEmailService}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.ok) {
      const data = await response.json();
      const vid = data.vid;
      const subscribeInfo = data.properties.subscribed_to.value;
      let formatedSubscribeInfo = null;
      if (subscribeInfo.includes(';')) {
        formatedSubscribeInfo = subscribeInfo.split(';');
      } else {
        formatedSubscribeInfo = [subscribeInfo];
      }
      if (!formatedSubscribeInfo.includes(groupCampainEmailService)) {
        formatedSubscribeInfo.push(groupCampainEmailService);
        try {
          const response2 = await fetch(
            `https://api.hubapi.com/contacts/v1/contact/vid/${vid}/profile`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${tokenCampainEmailService}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                properties: [
                  {
                    property: 'subscribed_to',
                    value: formatedSubscribeInfo.join(';'),
                  },
                ],
              }),
            },
          );
          if (response2.ok) {
            return new Response(
              JSON.stringify({
                message: 'Subscribed successfully',
              }),
              {
                status: 200,
                headers: {
                  'content-type': 'application/json',
                },
              },
            );
          } else {
            const data2 = await response2.json();
            return new Response(JSON.stringify(data2), {
              status: 401,
              headers: {
                'content-type': 'application/json',
              },
            });
          }
        } catch (error) {
          return new Response(
            JSON.stringify({ message: 'Error while update contact' }),
            {
              status: 401,
              headers: {
                'content-type': 'application/json',
              },
            },
          );
        }
      }
      return new Response(
        JSON.stringify({
          message: 'Already subscribed',
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          message: 'Contact not updated',
        }),
        {
          status: 401,
          headers: {
            'content-type': 'application/json',
          },
        },
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Unknow Error' }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
};
export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ message: 'Email not valid' }), {
      status: 401,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  try {
    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenCampainEmailService}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            email,
            subscribed_to: groupCampainEmailService,
          },
        }),
      },
    );
    if (response.ok) {
      return new Response(
        JSON.stringify({
          message: 'Subscribed successfully',
        }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
          },
        },
      );
    } else {
      return new Response(
        JSON.stringify({
          message: 'Email already subscribed',
        }),
        {
          status: 409,
          headers: {
            'content-type': 'application/json',
          },
        },
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Unknow Error' }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
};
