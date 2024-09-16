import { Helmet } from "react-helmet-async";

const Terms = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Helmet>
        <title>Terms Page</title>
      </Helmet>

      <div>
        <h1>Shipping Terms & Conditions</h1>
        <ul>
          <li>
            1. General Shipping Information We offer worldwide shipping for all
            our sports clothing products. Orders are processed within 1-2
            business days, excluding weekends and holidays. Please note that
            processing times may be extended during peak shopping periods.
          </li>
          <li>
            2. Shipping Methods and Delivery Times Standard Shipping: Delivery
            within 5-10 business days for domestic orders, and 10-20 business
            days for international orders. Express Shipping: Delivery within 2-5
            business days for domestic orders, and 5-10 business days for
            international orders. Delivery times are estimates and may vary due
            to factors beyond our control, such as customs delays or carrier
            issues.
          </li>
          <li>
            3. Shipping Costs Shipping costs are calculated at checkout based on
            the destination, shipping method, and the weight of the package.
            Free standard shipping is available for domestic orders over $100.
            Express shipping charges apply regardless of order value.
          </li>
          <li>
            4. Order Tracking Once your order has been shipped, you will receive
            a confirmation email with a tracking number and a link to track your
            package. Please allow 24-48 hours for the tracking information to
            update.
          </li>
          <li>
            5. Shipping Restrictions We do not ship to P.O. Boxes, APO/FPO
            addresses, or any country subject to international trade
            restrictions. Some items may be subject to additional shipping
            charges due to size, weight, or destination.
          </li>
          <li>
            6. Customs, Duties, and Taxes For international orders, customs
            duties, taxes, and other fees may apply. These charges are the
            responsibility of the customer and are not included in the shipping
            cost. We recommend checking with your local customs office for more
            information.
          </li>
          <li>
            7. Undeliverable Packages If a package is returned to us as
            undeliverable due to an incorrect address or refusal to accept
            delivery, we will issue a refund for the product(s) only, minus the
            original shipping costs. Reshipping the package will require
            additional shipping charges.
          </li>
          8. Damaged or Lost Packages
          <li>
            If your package arrives damaged, please contact us within 48 hours
            of delivery with photos of the damage and packaging. We will assist
            in filing a claim with the carrier and provide a replacement or
            refund. If your package is lost in transit, please contact us as
            soon as possible. We will work with the carrier to locate your
            package and, if necessary, issue a replacement or refund.
          </li>
          <li>
            {" "}
            9. Changes to Shipping Information Please ensure that your shipping
            address is correct at the time of purchase. We are unable to change
            the shipping address once the order has been processed.
          </li>
          <li>
            10. Contact Information For any questions or concerns regarding
            shipping, please contact our customer service team at [Your Contact
            Information]. We are here to assist you Monday through Friday, 9 AM
            to 5 PM (local time).
          </li>
        </ul>
      </div>
    </>
  );
};

export default Terms;
