import { createLoan, repayLoan, getLoansForUser } from "../services/borrowService.js";

export const borrowFunds = async (req, res) => {
   try {
      const { tokenId, amount } = req.body;
      const walletAddress = req.user.walletAddress;

      const loan = await createLoan(walletAddress, tokenId, amount);
      res.json(loan);
   } catch (err) {
      console.error("Borrow error:", err);
      res.status(500).json({ error: "Borrowing failed" });
   }
};

export const repayFunds = async (req, res) => {
   try {
      const { loanId } = req.params;
      const walletAddress = req.user.walletAddress;

      const loan = await repayLoan(walletAddress, loanId);
      res.json(loan);
   } catch (err) {
      console.error("Repay error:", err);
      res.status(500).json({ error: "Repayment failed" });
   }
};

export const getMyLoans = async (req, res) => {
   try {
      const walletAddress = req.user.walletAddress;
      const loans = await getLoansForUser(walletAddress);
      res.json(loans);
   } catch (err) {
      console.error("Loan fetch error:", err);
      res.status(500).json({ error: "Failed to fetch loans" });
   }
};
