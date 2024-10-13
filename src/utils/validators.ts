import { collections, members, Users } from "./interfaces";

interface errors {
  statusCode:number,
  message:String
}

export function validateUser(user: Users) {
    const errors: errors= {
      statusCode:400,
      message:''
    };
  
    if (!user.name || user.name.trim().length === 0) {
      errors.message = 'Name is required.';
    }
  
    if (!user.contact || user.contact.trim().length === 0) {
      errors.message ='Contact is required.';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email || !emailRegex.test(user.email)) {
      errors.message ='Valid email is required.';
    }
  
    if (!user.password || user.password.length < 6) {
      errors.message ='Password must be at least 6 characters long and contain at least one number.';
    }
  
    if (!user.organizationId) {
      errors.message ='Organization ID is required.';
    }
  
    return errors?.message?.length !== 0 ? errors : null;
}
  
export function loginValidate(user:Users){
  const errors: errors= {
    statusCode:400,
    message:''
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email || !emailRegex.test(user.email)) {
    errors.message ='Valid email is required.';
  }

  if (!user.password || user?.password?.trim()?.length == 0) {
    errors.message ='Valid Password is required';
  }
  return errors?.message?.length !== 0 ? errors : null
}

export function validateOrganization(user: Users) {
  const errors: errors= {
    statusCode:400,
    message:''
  };

  if (!user.name || user.name.trim().length === 0) {
    errors.message = 'Name is required.';
  }

  if (!user.contact || user.contact.trim().length === 0) {
    errors.message ='Contact is required.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email || !emailRegex.test(user.email)) {
    errors.message ='Valid email is required.';
  }

  return errors?.message?.length !== 0 ? errors : null;
}

export function validateMember(member: members) {
  const errors: errors= {
    statusCode:400,
    message:''
  };

 if (typeof member.code !== 'number' || member.code <= 0 || !Number.isInteger(member.code)) {
  errors.message = "Code must be a positive integer";
}

const validMilkTypes = ['Cow', 'Buf'];
if (!member.milkType || !validMilkTypes.includes(member.milkType)) {
  errors.message = "Milk type must be 'Cow', 'Buffalo', or 'Goat'";
}

if (typeof member.memberName !== 'string' || member.memberName.length < 3 || member.memberName.length > 50) {
  errors.message = "Member name must be between 3 and 50 characters";
}

if (typeof member.contactNo !== 'number' || !/^\d{10}$/.test(member.contactNo.toString())) {
  errors.message = "Contact number must be a 10-digit number";
}

  return errors?.message?.length !== 0 ? errors : null;
}

export function validateRates(params: any) {
  const errors: errors= {
    statusCode:400,
    message:''
  };

if (!params.fat) {
    errors.message = "fat  is required.'";
} 

if (!params.snf) {
  errors.message = "snf  is required.'";
}  
const validMilkTypes = ['Cow', 'Buf'];
if (!params.milkType || !validMilkTypes.includes(params.milkType)) {
  errors.message = "Milk type must be 'Cow', 'Buf'";
}


  return errors?.message?.length !== 0 ? errors : null;
}

export function validateMilkRecord(record: collections) {
  const errors: errors = {
    statusCode: 400,
    message: ''
  };

  if (!(record.date instanceof Date)) {
    record.date = new Date();  // Convert to Date object
  }
  
  // Now validate if the date is valid
  if (isNaN(record.date.getTime())) {
    errors.message = "Date must be a valid date.";
  }

  const validShifts = ['Morning', 'Evening'];
  if (!record.shift || !validShifts.includes(record.shift)) {
    errors.message = "Shift must be either 'Morning' or 'Evening'.";
  }

  // Validate code (must be a positive integer)
  if (typeof record.code !== 'number' || record.code <= 0 || !Number.isInteger(record.code)) {
    errors.message = "Code must be a positive integer.";
  }

  // Validate milk (should be either 'Cow', 'Buffalo', or 'Goat')
  const validMilkTypes = ['Cow', 'Buf'];
  if (!record.milk || !validMilkTypes.includes(record.milk)) {
    errors.message = "Milk type must be 'Cow', 'Buffalo', or 'Goat'.";
  }

  // Validate name (must be a string between 3 and 50 characters)
  if (typeof record.name !== 'string' || record.name.length < 3 || record.name.length > 50) {
    errors.message = "Name must be between 3 and 50 characters.";
  }

  // Validate fat (should be a number between 0 and 100)
  if (typeof record.fat !== 'number' || record.fat < 0 || record.fat > 100) {
    errors.message = "Fat must be a number between 0 and 100.";
  }

  // Validate snf (should be a number between 0 and 100)
  if (typeof record.snf !== 'number' || record.snf < 0 || record.snf > 100) {
    errors.message = "SNF must be a number between 0 and 100.";
  }

  // Validate qty (must be a positive number)
  if (typeof record.qty !== 'number' || record.qty <= 0) {
    errors.message = "Quantity must be a positive number.";
  }

  // Validate rate (must be a positive number)
  if (typeof record.rate !== 'number' || record.rate <= 0) {
    errors.message = "Rate must be a positive number.";
  }

  // Validate amount (must be a positive number)
  if (typeof record.amount !== 'number' || record.amount <= 0) {
    errors.message = "Amount must be a positive number.";
  }

  // Validate isEdited (must be a boolean)
  if (typeof record.isEdited !== 'boolean') {
    errors.message = "isEdited must be a boolean.";
  }

  return errors.message.length !== 0 ? errors : null;
}

export function validateMilkRecordUpdate(record: Partial<collections>) {
  const errors: errors = {
    statusCode: 400,
    message: ''
  };

  // Validate date (only if present)
  if (record.date !== undefined) {
    if (!(record.date instanceof Date) || isNaN(record.date.getTime())) {
      errors.message = "Date must be a valid date.";
    }
  }

  // Validate shift (only if present)
  if (record.shift !== undefined) {
    const validShifts = ['Morning', 'Evening'];
    if (!validShifts.includes(record.shift)) {
      errors.message = "Shift must be either 'Morning' or 'Evening'.";
    }
  }

  // Validate code (only if present)
  if (record.code !== undefined) {
    if (typeof record.code !== 'number' || record.code <= 0 || !Number.isInteger(record.code)) {
      errors.message = "Code must be a positive integer.";
    }
  }

  // Validate milk (only if present)
  if (record.milk !== undefined) {
    const validMilkTypes = ['Cow', 'Buf', 'Goat'];
    if (!validMilkTypes.includes(record.milk)) {
      errors.message = "Milk type must be 'Cow', 'Buffalo', or 'Goat'.";
    }
  }

  // Validate name (only if present)
  if (record.name !== undefined) {
    if (typeof record.name !== 'string' || record.name.length < 3 || record.name.length > 50) {
      errors.message = "Name must be between 3 and 50 characters.";
    }
  }

  // Validate fat (only if present)
  if (record.fat !== undefined) {
    if (typeof record.fat !== 'number' || record.fat < 0 || record.fat > 100) {
      errors.message = "Fat must be a number between 0 and 100.";
    }
  }

  // Validate snf (only if present)
  if (record.snf !== undefined) {
    if (typeof record.snf !== 'number' || record.snf < 0 || record.snf > 100) {
      errors.message = "SNF must be a number between 0 and 100.";
    }
  }

  // Validate qty (only if present)
  if (record.qty !== undefined) {
    if (typeof record.qty !== 'number' || record.qty <= 0) {
      errors.message = "Quantity must be a positive number.";
    }
  }

  // Validate rate (only if present)
  if (record.rate !== undefined) {
    if (typeof record.rate !== 'number' || record.rate <= 0) {
      errors.message = "Rate must be a positive number.";
    }
  }

  // Validate amount (only if present)
  if (record.amount !== undefined) {
    if (typeof record.amount !== 'number' || record.amount <= 0) {
      errors.message = "Amount must be a positive number.";
    }
  }

  // Validate isEdited (only if present)
  if (record.isEdited !== undefined) {
    if (typeof record.isEdited !== 'boolean') {
      errors.message = "isEdited must be a boolean.";
    }
  }

  return errors.message.length !== 0 ? errors : null;
}
