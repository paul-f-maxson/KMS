import { useState, useCallback } from 'react';

export type ActiveMemberChangeHandler = (
  _: React.ChangeEvent<{}>,
  newActiveMemberValue: number
) => void;

/** A Hook used to implement an 'active member' system
 * @description Handle a React.ChangeEvent by updating a tab index value kept in state. This can be used eg to designate a 'selected tab', by applying a specific piece of styling to the member of a set of buttons based on whether the index of that button within the set matches the 'active member value' this hook provides.
 * @param initialValue - The index corresponding to the default active member
 * @returns A tuple of the current active member value and a (memoized) change event handler
 */
function useActiveMember(initialValue: number) {
  const [activeMemberIndex, setActiveMemberIndex] = useState(initialValue);

  const handleActiveMemberChange: ActiveMemberChangeHandler = useCallback(
    (_, newActiveMemberValue: number) => {
      setActiveMemberIndex(newActiveMemberValue);
    },
    []
  );

  // This typecast seems to be necessary with tuples
  return [activeMemberIndex, handleActiveMemberChange] as [
    number,
    ActiveMemberChangeHandler
  ];
}

export default useActiveMember;
